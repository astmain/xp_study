class U {
    value;
    next;

    constructor(E) {
        this.value = E
    }
}

class k {
    #A;
    #B;
    #Q;

    constructor() {
        this.clear()
    }

    enqueue(E) {
        const g = new U(E);
        this.#A ? (this.#B.next = g, this.#B = g) : (this.#A = g, this.#B = g), this.#Q++
    }

    dequeue() {
        const E = this.#A;
        if (E) return this.#A = this.#A.next, this.#Q--, E.value
    }

    peek() {
        if (this.#A) return this.#A.value
    }

    clear() {
        this.#A = void 0, this.#B = void 0, this.#Q = 0
    }

    get size() {
        return this.#Q
    }

    * [Symbol.iterator]() {
        let E = this.#A;
        for (; E;) yield E.value, E = E.next
    }
}

let uu = function Y(o) {
    const N = {
        bind(o, E, g) {
            return o.bind(g)
        },
    }

    if (!((Number.isInteger(o) || o === Number.POSITIVE_INFINITY) && o > 0)) throw new TypeError("Expected `concurrency` to be a number from 1 and up");
    const E = new k;
    let g = 0;
    // debugger
    const I = () => {
        g--, E.size > 0 && E.dequeue()()
    }, A = async (C, G, D) => {
        g++;
        const F = (async () => C(...D))();
        G(F);
        try {
            await F
        } catch {
        }
        I()
    }, B = (C, G, D) => {
        E.enqueue(N.bind(A.bind(void 0, C, G, D))), (async () => (await Promise.resolve(), g < o && E.size > 0 && E.dequeue()()))()
    }, Q = (C, ...G) => new Promise(D => {
        B(C, D, G)
    });
    return Object.defineProperties(Q, {
        activeCount: {
            get: () => g
        }, pendingCount: {
            get: () => E.size
        }, clearQueue: {
            value() {
                E.clear()
            }
        }
    }), Q
}
let 工具方法_消息队列=uu
module.exports = 工具方法_消息队列