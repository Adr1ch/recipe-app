// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// async function main() {
//   await prisma.user.createMany({
//     data: [
//       {
//         id: "1ryghrygr46846",
//         email: "test12@gmail.com",
//         password: "123456",
//         name: "dolor",
//       },
//     ],
//   });
//   await prisma.recipe.createMany({
//     data: [
//       {
//         title: "Борщ 2",
//         description: "Український борщ з буряком 2",
//         userId: "1ryghrygr46846",
//       },
//       {
//         title: "Паста Карбонара 2",
//         description: "Класична італійська паста 2",
//         userId: "1ryghrygr46846",
//       },
//       {
//         title: "Омлет ",
//         description: "Простий омлет з яйцями та молоком ",
//         userId: "1ryghrygr46846",
//       },
//     ],
//   });

//   console.log("✅ Тестові рецепти додані! Тестові юзери додані!");
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect());

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          aboutMe: "I love cooking!",
          allergens: ["nuts", "gluten"],
          profileImage: "profile1.jpg",
          role: "USER",
        },
        {
          id: "user-2",
          firstName: "Jane",
          lastName: "Smith",
          email: "janesmith@example.com",
          aboutMe: "Food enthusiast!",
          allergens: ["dairy"],
          profileImage: "profile2.jpg",
          role: "USER",
        },
      ],
    });

    await prisma.recipe.createMany({
      data: [
        {
          id: 1,
          name: "Борщ",
          photo: "borsh.jpg",
          cookingTime: 90,
          description: "Український борщ з буряком",
          calories: 250,
          tags: ["традиційне", "перше"],
          difficulty: "Середній",
          status: "Опубліковано",
          ownerId: "user-1",
          favouritesTotal: 5,
          ingredients: ["буряк", "картопля", "м’ясо", "капуста"],
        },
        {
          id: 2,
          name: "Паста Карбонара",
          photo: "carbonara.jpg",
          cookingTime: 30,
          description: "Класична італійська паста",
          calories: 500,
          tags: ["італійське", "макарони"],
          difficulty: "Легкий",
          status: "Опубліковано",
          ownerId: "user-2",
          favouritesTotal: 3,
          ingredients: ["спагеті", "яйця", "бекон", "пармезан"],
        },
      ],
    });

    await prisma.tag.createMany({
      data: [
        {
          id: 1,
          name: "Здорове харчування",
          include: ["овочі"],
          exclude: ["фаст-фуд"],
        },
        {
          id: 2,
          name: "Вегетаріанське",
          include: ["овочі"],
          exclude: ["м'ясо"],
        },
      ],
    });

    await prisma.recipeTag.createMany({
      data: [
        { recipeId: 1, tagId: 1 },
        { recipeId: 2, tagId: 2 },
      ],
    });

    await prisma.userFavorites.createMany({
      data: [
        { userId: "user-1", recipeId: 2 },
        { userId: "user-2", recipeId: 1 },
      ],
    });

    console.log("Дані успішно додані!");
  } catch (error) {
    console.error("Помилка при додаванні даних:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

/**
 * rm -rf prisma/migrations
npx prisma migrate reset
npx prisma migrate dev --name init
npx prisma generate
 */
