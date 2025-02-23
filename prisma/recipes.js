const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.createMany({
    data: [
      { title: "Борщ", description: "Український борщ з буряком" },
      { title: "Паста Карбонара", description: "Класична італійська паста" },
      { title: "Омлет", description: "Простий омлет з яйцями та молоком" },
    ],
  });

  console.log("✅ Тестові рецепти додані!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
