export default async function findUserRoles(id: string) {
  try {
    const res = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/users/role/${id}`
    );
    const role = await res.json();
    // console.log("role: ", role);
    return role.role;
  } catch (err) {
    console.log(err);
  }
}
