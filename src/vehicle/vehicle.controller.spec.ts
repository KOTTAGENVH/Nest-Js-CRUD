import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { getModelToken } from '@nestjs/mongoose';
import { Vehicle } from './vehicle.model';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('VehicleController', () => {
  let vehicleController: VehicleController;
  let vehicleService: VehicleService;
  let vehicleModel: Model<Vehicle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        VehicleService,
        {
          provide: getModelToken('Vehicle'),
          useValue: Model,
        },
      ],
    }).compile();

    vehicleController = module.get<VehicleController>(VehicleController);
    vehicleService = module.get<VehicleService>(VehicleService);
    vehicleModel = module.get<Model<Vehicle>>(getModelToken('Vehicle'));
  });

  describe('addVehicle', () => {
    it('should add a new vehicle', async () => {
      const mockVehicle = {
        name: 'Test Vehicle',
        description: 'Test Description',
        plate: '123ABC',
      };
      const generatedId = 'test-id';

      jest.spyOn(vehicleService, 'insertVehicle').mockResolvedValue(generatedId);

      const result = await vehicleController.addVehicle(
        mockVehicle.name,
        mockVehicle.description,
        mockVehicle.plate,
      );

      expect(vehicleService.insertVehicle).toHaveBeenCalledWith(
        mockVehicle.name,
        mockVehicle.description,
        mockVehicle.plate,
      );
      expect(result).toEqual({ Name: generatedId });
    });
  });
});
