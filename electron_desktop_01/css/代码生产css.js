var mmm = ".w-aaa{min-width:aaapx !important;max-width:aaapx !important;}"
for (let index = 0; index < 1001; index++) {
  let aaa = mmm.replace(/aaa/g, index)
  console.log("", aaa)
}
