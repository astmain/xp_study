export default async function userinfo_role_find(id) {
  let res = await axios_api({
    method: "get",
    url: `/sys/userinfo_role_find?` + `id=${id}`,
  });
  console.log("res2  :", res);
  let result = res.data.code == 200 ? res.data.roles : false;
  return result;
}
