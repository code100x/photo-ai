import {
  PrismaClient,
  ModelTrainingStatusEnum,
  OutputImageStatusEnum,
  TransactionStatus,
  ModelTypeEnum,
  EthenecityEnum,
  EyeColorEnum,
  PlanType,
} from "@prisma/client";
import { subDays } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const modelTypes = [
  ModelTypeEnum.Man,
  ModelTypeEnum.Woman,
  ModelTypeEnum.Others,
];
const ethnicities = [
  EthenecityEnum.White,
  EthenecityEnum.Black,
  EthenecityEnum.Asian_American,
  EthenecityEnum.East_Asian,
  EthenecityEnum.South_East_Asian,
  EthenecityEnum.South_Asian,
  EthenecityEnum.Middle_Eastern,
  EthenecityEnum.Pacific,
  EthenecityEnum.Hispanic,
];
const eyeColors = [
  EyeColorEnum.Brown,
  EyeColorEnum.Blue,
  EyeColorEnum.Hazel,
  EyeColorEnum.Gray,
];

const dummyImage = (text: string) => {
  return `https://dummyimage.com/100x100/3357ff/ffffff&text=${text}`;
};
async function seed() {
  console.log("Starting database seeding...");

  await prisma.transaction.deleteMany();
  await prisma.userCredit.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.outputImages.deleteMany();
  await prisma.packPrompts.deleteMany();
  await prisma.model.deleteMany();
  await prisma.packs.deleteMany();
  await prisma.user.deleteMany();

  const users = Array.from({ length: 19 }, (_, i) => ({
    clerkId: `clerk_${uuidv4()}`,
    createdAt: subDays(new Date(), Math.floor(Math.random() * 30)),
    updatedAt: new Date(),
    email: `user${i + 1}@example.com`,
    name: `User ${i + 1}`,
    profilePicture: dummyImage(`User ${i + 1}`),
  }));
  await prisma.user.createMany({ data: users });
  console.log("Seeded 19 users");
  const createdUsers = await prisma.user.findMany();

  //   -----------------------------------------------
  const models = Array.from({ length: 15 }, (_, i) => ({
    createdAt: subDays(new Date(), Math.floor(Math.random() * 30)),
    updatedAt: new Date(),
    trainingStatus: ModelTrainingStatusEnum.Generated,
    name: `Model ${i + 1}`,
    userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    type: modelTypes[Math.floor(Math.random() * modelTypes.length)],
    age: Math.floor(Math.random() * 25) + 18,
    ethinicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
    eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
    bald: Math.random() > 0.5,
    triggerWord: `trigger${i + 1}`,
    tensorPath: `/tensor/model${i + 1}.pt`,
    thumbnail: dummyImage(`Model ${i + 1}`),
    falAiRequestId: `fal_${uuidv4()}`,
    zipUrl: `https://example.com/zip${i + 1}.zip`,
    open: Math.random() > 0.5,
  }));
  await prisma.model.createMany({ data: models });
  console.log("Seeded 15 trained models");

  const createdModels = await prisma.model.findMany();

  //   ======================
  const images = Array.from({ length: 14 }, (_, i) => ({
    createdAt: subDays(new Date(), Math.floor(Math.random() * 30)),
    updatedAt: new Date(),
    status: OutputImageStatusEnum.Generated,
    imageUrl: dummyImage(`Image ${i + 1}`),
    modelId: createdModels[Math.floor(Math.random() * createdModels.length)].id,
    userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    prompt: `A photo of a person ${i + 1}`,
    falAiRequestId: `fal_img_${uuidv4()}`,
  }));
  await prisma.outputImages.createMany({ data: images });
  console.log("Seeded 14 generated images");

  const packs = Array.from({ length: 12 }, (_, i) => ({
    name: `Pack ${i + 1}`,
    description: `Description for pack ${i + 1}`,
    imageUrl1: dummyImage(`Pack ${i + 1}`),
    imageUrl2: dummyImage(`Pack2 - ${i + 1}`),
  }));
  await prisma.packs.createMany({ data: packs });
  console.log("Seeded 12 packs");
  const createdPacks = await prisma.packs.findMany();



  const packPrompts = Array.from({ length: 20 }, (_, i) => ({
    prompt: `Prompt ${i + 1} for pack`,
    packId: createdPacks[Math.floor(Math.random() * createdPacks.length)].id,
  }));
  await prisma.packPrompts.createMany({ data: packPrompts });
  console.log("Seeded 20 pack prompts");

  const plans = [PlanType.basic, PlanType.premium];
  const subscriptions = Array.from({ length: 25 }, (_, i) => ({
    userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    plan: plans[Math.floor(Math.random() * plans.length)],
    paymentId: `pay_${uuidv4()}`,
    orderId: `order_${uuidv4()}`,
    createdAt: subDays(new Date(), Math.floor(Math.random() * 30)),
    updatedAt: new Date(),
  }));
  await prisma.subscription.createMany({ data: subscriptions });
  console.log("Seeded 25 subscriptions");

  const userCredits = createdUsers.map((user) => ({
    userId: user.id,
    amount: Math.floor(Math.random() * 2500),
    createdAt: subDays(new Date(), Math.floor(Math.random() * 30)),
    updatedAt: new Date(),
  }));
  await prisma.userCredit.createMany({ data: userCredits });
  console.log("Seeded 25 user credits");

  const transactions = Array.from({ length: 10 }, (_, i) => ({
    createdAt: subDays(new Date(), Math.floor(Math.random() * 30)),
    updatedAt: new Date(),
    status: TransactionStatus.SUCCESS,
    amount: Math.random() < 0.5? 100 : 50 ,
    userId: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    currency: "USD",
    paymentId: `pay_${uuidv4()}`,
    orderId: `order_${uuidv4()}`,
    plan: plans[Math.floor(Math.random() * plans.length)],
  }));
  await prisma.transaction.createMany({ data: transactions });
  console.log("Seeded 10 transactions");

  console.log("Seeding completed!");
}

try {
  await seed();
} catch (e) {
  console.error("Seeding failed:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
