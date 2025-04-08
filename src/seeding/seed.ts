import { faker } from '@faker-js/faker';
import { GeneralReport } from 'src/general_reports/general_report.entity';
import { Station } from 'src/stations/station.entity';
import { Role } from 'src/users/enums/role.enum';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { GeneralReportStatus } from 'src/general_reports/enums/general_report_status.enum';
import { IssueType } from 'src/general_reports/enums/issue_types.enum';

const AppDataSource = new DataSource({
  type: 'mssql',
  synchronize: true,
  port: 26433,
  username: 'nwlproduction',
  password: 'Nwl!2563789!',
  host: '85.204.247.82',
  database: 'Highway_weigh',
  options: {
    encrypt: false,
  },
  entities: [User, Station, GeneralReport],
});

function readImageFile(filename: string): Buffer {
  const imagePath = path.join(__dirname, 'images', filename);
  return fs.readFileSync(imagePath);
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const stationRepo = AppDataSource.getRepository(Station);
  const generalReportRepo = AppDataSource.getRepository(GeneralReport);

  try {
    // Disable foreign key constraints
    await AppDataSource.query(
      'EXEC sp_MSforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT ALL"',
    );

    // Delete data from tables in the correct order
    await AppDataSource.query('DELETE FROM [general_report]');
    await AppDataSource.query('DELETE FROM [station]');
    await AppDataSource.query('DELETE FROM [user]');

    // Reset identity columns (auto-increment)
    await AppDataSource.query('DBCC CHECKIDENT ([general_report], RESEED, 0)');
    await AppDataSource.query('DBCC CHECKIDENT ([station], RESEED, 0)');
    await AppDataSource.query('DBCC CHECKIDENT ([user], RESEED, 0)');

    // Re-enable foreign key constraints
    await AppDataSource.query(
      'EXEC sp_MSforeachtable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL"',
    );

    faker.seed(123);
    const roles: Role[] = [
      Role.DIRECTOR,
      Role.HEAD_STATIONS,
      Role.STATION_STAFF,
      Role.INSPECTOR,
      Role.ADMIN,
    ];

    const stationData = [
      { name: 'Grand Palace, Bangkok', lat: 13.75, long: 100.4913 },
      { name: 'Wat Arun, Bangkok', lat: 13.7436, long: 100.4889 },
      { name: 'Chiang Mai Old City', lat: 18.7883, long: 98.9853 },
      { name: 'Phuket Patong Beach', lat: 7.8966, long: 98.2956 },
      {
        name: 'Ayutthaya Historical Park',
        lat: 14.3559,
        long: 100.566,
      },
      {
        name: 'Erawan Shrine, Bangkok',
        lat: 13.7453,
        long: 100.5396,
      },
      { name: 'Railay Beach, Krabi', lat: 8.0117, long: 98.8373 },
      {
        name: 'Doi Inthanon, Chiang Mai',
        lat: 18.5883,
        long: 98.4878,
      },
      {
        name: 'Sukhothai Historical Park',
        lat: 17.0154,
        long: 99.82,
      },
      {
        name: 'Khao Yai National Park',
        lat: 14.4378,
        long: 101.3722,
      },
      {
        name: 'Wat Phra Kaew, Chiang Rai',
        lat: 19.9086,
        long: 99.832,
      },
      {
        name: 'Bridge on the River Kwai, Kanchanaburi',
        lat: 14.042,
        long: 99.5039,
      },
      {
        name: 'Chatuchak Weekend Market, Bangkok',
        lat: 13.8007,
        long: 100.552,
      },
      {
        name: 'Sanctuary of Truth, Pattaya',
        lat: 12.9723,
        long: 100.8842,
      },
      {
        name: 'Sam Phan Bok, Ubon Ratchathani',
        lat: 15.9962,
        long: 105.3885,
      },
      {
        name: 'Wat Mahathat, Nakhon Si Thammarat',
        lat: 8.4304,
        long: 99.9631,
      },
      { name: 'Koh Phi Phi Leh, Krabi', lat: 7.6786, long: 98.7657 },
      {
        name: 'Damnoen Saduak Floating Market, Ratchaburi',
        lat: 13.5186,
        long: 99.958,
      },
      {
        name: 'Phimai Historical Park, Nakhon Ratchasima',
        lat: 15.2201,
        long: 102.4931,
      },
      {
        name: 'Wat Phra That Doi Suthep, Chiang Mai',
        lat: 18.8049,
        long: 98.9215,
      },
      { name: 'Thai CC Tower', lat: 13.7186, long: 100.5215 },
    ];

    const stations = stationRepo.create(stationData);
    await stationRepo.save(stations);

    const userData = [
      {
        name: 'John Director',
        email: 'director@gmail.com',
        password: await hashPassword('12345678'),
        role: Role.DIRECTOR,
      },
      {
        name: 'Pan Head Stations',
        email: 'head@gmail.com',
        password: await hashPassword('12345678'),
        role: Role.HEAD_STATIONS,
      },
      {
        name: 'New Station Staff',
        email: 'staff@gmail.com',
        password: await hashPassword('12345678'),
        role: Role.STATION_STAFF,
      },
      {
        name: 'Jay Inspector',
        email: 'inspector@gmail.com',
        password: await hashPassword('12345678'),
        role: Role.INSPECTOR,
      },
      {
        name: 'Ploy Admin',
        email: 'admin@gmail.com',
        password: await hashPassword('12345678'),
        role: Role.ADMIN,
      },
    ];

    const users = userRepo.create(userData);
    await userRepo.save(users);

    const image1 = readImageFile('backpack.png');
    const image2 = readImageFile('drum.png');
    const image3 = readImageFile('registration_number.jpg');
    const image4 = readImageFile('truck.jpg');
    const image5 = readImageFile('shorts.png');
    const image6 = readImageFile('guitar.png');
    const image7 = readImageFile('pickup.jpg');
    const image8 = readImageFile('karati.png');
    const image9 = readImageFile('jeans.png');
    const image10 = readImageFile('sedan.jpeg');

    // const generalReportData = [
    //   {
    //     name: 'Scale malfunction at Grand Palace',
    //     detail:
    //       'The weighing scale at Grand Palace station is showing inconsistent readings. Needs immediate attention.',
    //     issue_type: IssueType.APPEAL_STAFF,
    //     comment: 'Technician scheduled for tomorrow',
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_created: users[5].id, // New Station Staff
    //     image: image1,
    //     station: stations[0].id, // Grand Palace
    //   },
    //   {
    //     name: 'Broken barrier at Wat Arun',
    //     detail:
    //       'The entry barrier at Wat Arun station is broken and vehicles can enter without proper weighing.',
    //     issue_type: IssueType.APPEAL_STAFF,
    //     comment: null,
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_created: users[5].id, // Jay Inspector
    //     station: stations[1].id, // Wat Arun
    //     image: image2,
    //   },
    //   {
    //     name: 'Staff shortage at Chiang Mai',
    //     detail:
    //       'We are understaffed at Chiang Mai station. Need at least two more operators for efficient operation.',
    //     issue_type: IssueType.APPEAL_STAFF,
    //     comment: 'HR is reviewing the request',
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_created: users[5].id, // New Station Staff
    //     station: stations[2].id, // Chiang Mai
    //     image: image3,
    //   },
    //   {
    //     name: 'Software update needed at Phuket',
    //     detail:
    //       'The weighing software at Phuket station is outdated and causing delays in processing.',
    //     issue_type: IssueType.APPEAL_STAFF,
    //     comment: 'IT team scheduled update for next week',
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_edited_by_user_id: 5, // Ploy Admin
    //     who_created: users[5].id, // Jay Inspector
    //     station: stations[3].id, // Phuket
    //     image: image4,
    //   },
    //   {
    //     name: 'Lighting issues at Ayutthaya',
    //     detail:
    //       'The night lighting at Ayutthaya station is insufficient, creating safety concerns for night operations.',
    //     issue_type: IssueType.OVERWEIGHT,
    //     comment: null,
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_created: users[5].id, // New Station Staff
    //     station: stations[4].id, // Ayutthaya
    //     image: image5,
    //   },
    //   {
    //     name: 'Drainage problem at Erawan Shrine',
    //     detail:
    //       'After heavy rain, the weighing area gets flooded. Need to improve drainage system.',
    //     issue_type: IssueType.APPEAL_STAFF,
    //     comment: 'Maintenance team inspected and proposed solutions',
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_created: users[5].id, // Jay Inspector
    //     station: stations[5].id, // Erawan Shrine
    //     image: image6,
    //   },
    //   {
    //     name: 'Calibration needed at Railay Beach',
    //     detail:
    //       'The scales at Railay Beach station need recalibration. Currently showing 2% deviation from standard.',
    //     issue_type: IssueType.APPEAL_STAFF,
    //     comment: 'Calibration completed',
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_created: users[5].id, // New Station Staff
    //     station: stations[6].id, // Railay Beach
    //     image: image7,
    //   },
    //   {
    //     name: 'Security concern at Doi Inthanon',
    //     detail:
    //       'There have been reports of unauthorized access to the weighing station during night hours.',
    //     issue_type: IssueType.OVERWEIGHT,
    //     comment: 'Security personnel increased',
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_created: users[5].id, // Jay Inspector
    //     station: stations[7].id, // Doi Inthanon
    //     image: image8,
    //   },
    //   {
    //     name: 'Power outages at Sukhothai',
    //     detail:
    //       'Frequent power outages affecting operations at Sukhothai station. Need backup generator.',
    //     issue_type: IssueType.OVERWEIGHT,
    //     comment: 'Request for generator denied due to budget constraints',
    //     is_active: true,
    //     status: GeneralReportStatus.REJECTED,
    //     who_created: users[5].id, // New Station Staff
    //     station: stations[8].id, // Sukhothai
    //     image: image9,
    //   },
    //   {
    //     name: 'Training request for Khao Yai staff',
    //     detail:
    //       'Staff at Khao Yai station need training on the new weighing procedures implemented last month.',
    //     issue_type: IssueType.APPEAL_STAFF,
    //     comment: 'Training scheduled for next month',
    //     is_active: true,
    //     status: GeneralReportStatus.PENDING,
    //     who_created: users[5].id, // Jay Inspector
    //     station: stations[9].id, // Khao Yai
    //     image: image10,
    //   },
    // ];

    // const generalReports = generalReportRepo.create(generalReportData);
    // await generalReportRepo.save(generalReports);

    console.log('✅ Seed complete!');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
});
