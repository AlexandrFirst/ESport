import {
  Category,
  Competition,
  Fight,
  Organisation,
  PrismaClient,
  Round,
  User,
  Request,
} from '@prisma/client';

const prisma = new PrismaClient();

const users: User[] = [
  {
    id: 1,
    name: 'Test user 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const userRequests: Request[] = [
  {
    id: 1,
    userId: 1,
    isAccepted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const organisations: Organisation[] = [
  {
    id: 1,
    name: 'Test organisation 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Test organisation 2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const comptetitions: Competition[] = [
  {
    id: 1,
    title: 'Competition 1',
    dateStart: new Date(),
    dateEnd: new Date(),
    organisationId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 1,
    isRegistrationOpen: true,
  },
  {
    id: 2,
    title: 'Competition 2',
    dateStart: new Date(),
    organisationId: 1,
    dateEnd: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 1,
    isRegistrationOpen: false,
  },
];

const categories: Category[] = [
  {
    id: 1,
    title: 'Category 1',
    competitionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Category 2',
    competitionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'Category 3',
    competitionId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const rounds: Round[] = [
  {
    id: 1,
    title: 'Round 1',
    categoryId: 1,
    roundNum: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Round 2',
    categoryId: 1,
    roundNum: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'Round 3',
    categoryId: 1,
    roundNum: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: 'Round 1',
    categoryId: 2,
    roundNum: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: 'Round 2',
    categoryId: 2,
    roundNum: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const fights: Fight[] = [
  {
    id: 1,
    isProceed: true,
    roundId: 1,
    fightNumber: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    isProceed: false,
    roundId: 1,
    fightNumber: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    isProceed: false,
    roundId: 1,
    fightNumber: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    isProceed: false,
    roundId: 1,
    fightNumber: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const user of users) {
    const usr = await prisma.user.create({
      data: user,
    });
    console.log(`Created user with id: ${usr.id}`);
  }
  for (const userRequest of userRequests) {
    const usrReq = await prisma.request.create({
      data: userRequest,
    });
    console.log(`Created user request with id: ${usrReq.id}`);
  }
  for (const organisation of organisations) {
    const org = await prisma.organisation.create({
      data: organisation,
    });
    console.log(`Created organisation with id: ${org.id}`);
  }
  for (const competition of comptetitions) {
    const comp = await prisma.competition.create({
      data: competition,
    });
    console.log(`Created competition with id: ${comp.id}`);
  }
  for (const category of categories) {
    const cat = await prisma.category.create({
      data: category,
    });
    console.log(`Created category with id: ${cat.id}`);
  }
  for (const round of rounds) {
    const rnd = await prisma.round.create({
      data: round,
    });
    console.log(`Created round with id: ${rnd.id}`);
  }
  for (const fight of fights) {
    const fgt = await prisma.fight.create({
      data: fight,
    });
    console.log(`Created fight with id: ${fgt.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((error) => {
    console.log('===error===', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
