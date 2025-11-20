export default async function findUserRoles(id: string) {
  try {
    const role = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/users/role/${id}`
    );

    console.log("role: ", role?.json());
    return role.json();
  } catch (err) {
    console.log(err);
  }
}
