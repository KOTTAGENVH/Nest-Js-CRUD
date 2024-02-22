import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';


@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
 async addVehicle(
    @Body('name') vehicleName: string,
    @Body('description') vehicleDesc: string,
    @Body('plate') vehiclePlate: string,
 ) {
    const generatedId = await this.vehicleService.insertVehicle(
      vehicleName,
      vehicleDesc,
      vehiclePlate,
    );
    return { Name: generatedId };
 }

  @Get()
  async getAllVehicles() {
    const vehicles = await this.vehicleService.getVehicles();
    return vehicles;
  }

  @Get(':id')
  getVehicle(@Param('id') vehicleId: string) {
    return this.vehicleService.getSingleVehicle(vehicleId);
  }

  @Put(':id')
  async updateVehicle(
    @Param('id') vehicleId: string,
    @Body('name') vehicleName: string,
    @Body('description') vehicleDesc: string,
    @Body('plate') vehiclePlate: string,
    ) {
 return   await this.vehicleService.updateVehicle(
      vehicleId,
      vehicleName,
      vehicleDesc,
      vehiclePlate,

    );
   
  }

  @Delete(':id')
  async removeVehicle(@Param('id') vehicleId: string) {
    return   await this.vehicleService.deleteVehicle(vehicleId);
  
  }
  }
  
