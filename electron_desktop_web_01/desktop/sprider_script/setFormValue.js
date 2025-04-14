async function setFormValue(selector, value) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }

    const tagName = element.tagName.toLowerCase();
    const type = element.type?.toLowerCase();

    // 处理特殊类型的表单元素
    if (tagName === 'input' && (type === 'checkbox' || type === 'radio')) {
        element.checked = !!value;
        element.dispatchEvent(new Event('click', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        return Promise.resolve(true);
    }

    if (tagName === 'select') {
        if (!element.multiple) {
            element.value = value;
        } else {
            const values = Array.isArray(value) ? value : [value];
            Array.from(element.options).forEach(option => {
                option.selected = values.includes(option.value);
            });
        }
        element.dispatchEvent(new Event('change', { bubbles: true }));
        return Promise.resolve(true);
    }

    // 对于文本类型的输入，使用原始的属性描述符方法
    const originalDescriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(element), 
        'value'
    );

    return new Promise((resolve, reject) => {
        try {
            Object.defineProperty(element, 'value', {
                configurable: true,
                enumerable: true,
                get: function() {
                    return value;
                },
                set: function(newValue) {
                    if (originalDescriptor && originalDescriptor.set) {
                        originalDescriptor.set.call(this, value);
                    }
                    
                    this.dispatchEvent(new Event('input', { bubbles: true }));
                    this.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });

            element.value = value;
            
            if (tagName === 'textarea') {
                element.textContent = value;
            }

            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
            element.dispatchEvent(new InputEvent('input', {
                bubbles: true,
                cancelable: true,
                inputType: 'insertText',
                data: value
            }));

            requestAnimationFrame(() => {
                const isValid = tagName === 'select' && element.multiple ?
                    Array.from(element.selectedOptions)
                        .every(option => value.includes(option.value)) :
                    element.value === value;

                if (isValid) {
                    resolve(true);
                } else {
                    reject(new Error('Value not set correctly'));
                }
                
                if (originalDescriptor) {
                    Object.defineProperty(element, 'value', originalDescriptor);
                }
            });

        } catch (error) {
            if (originalDescriptor) {
                Object.defineProperty(element, 'value', originalDescriptor);
            }
            reject(error);
        }
    });
}

// 使用示例
async function updateForm() {
    try {
        // 文本输入
        await setFormValue('.title-input', '视频标题');
        
        // 文本区域
        await setFormValue('.description-textarea', '视频描述');
        
        // 复选框
        await setFormValue('.terms-checkbox', true);
        
        // 单选框
        await setFormValue('.visibility-radio', true);
        
        // 下拉选择（单选）
        await setFormValue('.category-select', 'entertainment');
        
        // 下拉选择（多选）
        await setFormValue('.tags-select', ['tag1', 'tag2']);
        
        console.log('表单更新成功');
    } catch (error) {
        console.error('表单更新失败:', error);
    }
}