import { prisma, User } from './generated/prisma-client'

async function createUser(): Promise<User> {
    // Create a new user called `Alice`
    const newUser = await prisma.createUser({ name: 'Alice' })
    console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
    return newUser;
}

async function updateUser(id: string): Promise<User> {
    const updated = await prisma
        .updateUser({
            where: { id },
            data: { name: 'Bob' }
        });
    console.log(`Updated user with id ${id} to have name ${updated.name}.`);
    return updated;
}

async function deleteUser(id: string): Promise<User> {
    const deleted = await prisma.deleteUser({ id });
    console.log(`Deleted user with id ${deleted.id}`);
    return deleted;
}

async function fetchUsersByName(name: string): Promise<User[]> {
    const users = await prisma.users({ where: { name }});
    console.log(`Found ${users.length} users with name ${name}.`);
    return users;
}

async function readAllUsers(): Promise<User[]> {
    // Read all users from the database and print them to the console
    const allUsers = await prisma.users()
    console.log(allUsers)
    return allUsers;
}

async function main() {

    await createUser();
    const newUser2 = await createUser();
    await updateUser(newUser2.id);
    await deleteUser(newUser2.id);
    await fetchUsersByName("Alice");
    await readAllUsers();
}

type EmailProps = { email: string };

async function createUserWithPosts({email}: EmailProps) {
    // Create a new user with a new post
    const newUser = await prisma
        .createUser({
        name: "Bob",
        email,
        posts: {
            create: [{
            title: "Join us for GraphQL Conf in 2019",
            }, {
            title: "Subscribe to GraphQL Weekly for GraphQL news",
            }]
        },
        })
        console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
        return newUser;
}

// https://www.prisma.io/docs/get-started/02-change-data-model-TYPESCRIPT-t101/
async function main2() {

    const email =  "bob@prisma.io";
    try {
        await createUserWithPosts({email});
    } catch (err) {
        console.error("Failed creating user, it might exist already.");
    }
  
    // Read all users from the database and print them to the console
    const allUsers = await prisma.users()
    console.log(allUsers)
  
    const allPosts = await prisma.posts()
    console.log(allPosts)

    const postsByUser = await prisma
        .user({ email })
        .posts();

    console.log(`All posts by that user: ${JSON.stringify(postsByUser)}`);
}

main().catch(e => console.error(e))
main2().catch(e => console.error(e));