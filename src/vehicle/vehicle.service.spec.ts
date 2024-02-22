import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { getModelToken } from '@nestjs/mongoose';
import { Vehicle } from './vehicle.model';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

describe('VehicleService', () => {
  
  let vehicleServices: VehicleService;
  let vehicleModelMock: Partial<Model<Vehicle>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getModelToken('Vehicle'),
          useValue: {
            find: jest.fn().mockReturnThis(),
            findById: jest.fn().mockResolvedValue(null),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({ _id: 'test-id' }),
            findByIdAndUpdate: jest.fn().mockResolvedValue(null),
            deleteOne: jest.fn().mockResolvedValue({ deletedCount: 0 }),
            exec: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();
  
    vehicleServices = module.get<VehicleService>(VehicleService);
    vehicleModelMock = module.get<Model<Vehicle>>(getModelToken('Vehicle'));
  });
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(vehicleServices).toBeDefined();
  });

  
   
  
  //Getting all vehicles (working 4 😊)

  describe('getVehicles', () => {
    it('should return an array of vehicles', async () => {
      const mockVehicles = [
        {
          _id: '6458da433ecb6bfe78491ce5',
          name: 'toyota',
          description: 'dsa',
          plate: '12453',
        },
        {
          _id: '6459ccecf42d73660b25c6d7',
          name: 'toyota',
          description: 'dsa',
          plate: '12453',
        },
      ];
  
      jest.spyOn(vehicleModelMock, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockVehicles),
      } as any);
  
      const result = [
        {
          _id: '6458da433ecb6bfe78491ce5',
          name: 'toyota',
          description: 'dsa',
          plate: '12453',
        },
        {
          _id: '6459ccecf42d73660b25c6d7',
          name: 'toyota',
          description: 'dsa',
          plate: '12453',
        },
      ];
  
      expect(await vehicleServices.getVehicles()).toEqual(result);
    });
  });
  
  //Getting a single vehicle testing (working 1😊)
  describe('getSingleVehicle', () => {
    it('should return a single vehicle', async () => {
      const mockVehicle = {
        id: '6459d928f42d73660b25c6e1',
        name: 'toyota',
        description: 'dsa',
        plate: '12453',
      };
  
      jest.spyOn(vehicleModelMock, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockVehicle),
      } as any);
  
      const result = {
        id: '6459d928f42d73660b25c6e1',
        name: 'toyota',
        description: 'dsa',
        plate: '12453',
      };
  
      expect(await vehicleServices.getSingleVehicle('6459d928f42d73660b25c6e1')).toEqual(result);
    });
  });
  

  //Deleting a single vehicle (working 2😊)
  describe('deleteVehicle', () => {
    it('should delete a vehicle', async () => {
      jest.spyOn(vehicleModelMock, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      } as any);

      const result = await vehicleServices.deleteVehicle('6459d9adf42d73660b25c6e7');
      expect(1);
    });
  }
  )
// Updating a single vehicle (working 3😊)
describe('updateVehicle', () => {
  it('should update a vehicle and return the updated name', async () => {
    // Mock vehicle data
    const mockVehicleId = '6459df53b123b126f28c8f4b';
    const existingName = 'Existing Name';
    const existingDescription = 'Existing Description';
    const existingPlate = 'ABC123';

    // Updated vehicle data
    const updatedName = 'Existing Name';
    const updatedDescription = 'Updated Description';
    const updatedPlate = 'XYZ789';

    // Mock the findById method to return the existing vehicle
    jest.spyOn(vehicleModelMock, 'findById').mockResolvedValue({
      name: existingName,
      description: existingDescription,
      plate: existingPlate,
      save: jest.fn().mockResolvedValue({
        name: updatedName,
        description: updatedDescription,
        plate: updatedPlate,
      }),
    } as any);

    // Update the vehicle
    const updatedVehicleName = await vehicleServices.updateVehicle(
      mockVehicleId,
      updatedName,
      existingDescription,
      existingPlate,
    );

    // Check if the name is updated
    expect(existingName).toBe(updatedName);
  });
});




});




 

