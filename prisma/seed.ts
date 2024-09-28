import { PrismaClient, Gender, Role, RoomStatus, RoomType, Payment, BookingStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = [];
  for (let i = 0; i < 20; i++) {
    users.push(
      await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]),
          birthDate: faker.date.past(),
          nationality: faker.location.country(),
          phone: faker.phone.number(),
          role: faker.helpers.arrayElement([Role.ADMIN, Role.GUEST]),
        },
      })
    );
  }

  // Seed Rooms
  const rooms = [];
  for (let i = 0; i < 15; i++) {
    rooms.push(
      await prisma.room.create({
        data: {
          roomNumber: faker.string.numeric(3),
          description: faker.lorem.sentence(),
          roomStatus: faker.helpers.arrayElement([
            RoomStatus.Available,
            RoomStatus.Booked,
            RoomStatus.Under_Maintenance,
          ]),
          roomType: faker.helpers.arrayElement([RoomType.Single, RoomType.Double, RoomType.Triple]),
          pricePerNight: parseFloat(
            faker.finance.amount({
              min: 100,
              max: 2000,
              dec: 2,
            })
          ),
        },
      })
    );
  }

  // Seed Bookings and BookingItems
  for (let i = 0; i < 30; i++) {
    const checkInDate = faker.date.future();
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + faker.number.int({ min: 1, max: 14 }));

    const booking = await prisma.booking.create({
      data: {
        userId: faker.helpers.arrayElement(users).id,
        checkInDate,
        checkOutDate,
        payment: faker.helpers.arrayElement([Payment.Cash, Payment.Visa, Payment.Deposit]),
        totalPrice: parseFloat(
          faker.finance.amount({
            min: 100,
            max: 2000,
            dec: 2,
          })
        ),
        bookingStatus: faker.helpers.arrayElement([BookingStatus.Paid, BookingStatus.Pending, BookingStatus.Cancelled]),
      },
    });

    // Create 1-3 BookingItems for each Booking
    const numBookingItems = faker.number.int({ min: 1, max: 3 });
    for (let j = 0; j < numBookingItems; j++) {
      await prisma.bookingItem.create({
        data: {
          bookingId: booking.id,
          roomId: faker.helpers.arrayElement(rooms).id,
        },
      });
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
