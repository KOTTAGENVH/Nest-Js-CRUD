import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from './vehicle.model';
import { error } from 'console';
// import { CreateVehicleDto } from './dto/create-vehicle.dto';
// import { UpdateVehicleDto } from './dto/update-vehicle.dto';


@Injectable()
export class VehicleService {
  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
  ) {}


  async insertVehicle(name: string, desc: string, plate: string) {
    if(!name && !desc && !plate){
      return {
        success: false,
        error: "Name, Description and Plate are required."
      };
    }
    
    else if (!name) {
      return {
        success: false,
        error: "Name is required."
      };
    } else if(!desc){
      return {
      success: false,
      error: "Description is required"
      }
    }else if(!plate){
      return {
        success: false,
        error: "Plate is required"
      }
    }
    try{
    const newVehicle = new this.vehicleModel({
      name,
      description: desc,
      plate
    });
    const result = await newVehicle.save();
    return result.name as string;
  }catch(InternalServerErrorException){
   return "Sorry you plate number is laready taken";
  }
  }


async getVehicles() {
  const vehicles = await this.vehicleModel.find().exec();
  return vehicles.map((veh) => ({
    _id: veh._id,
    name: veh.name,
    description: veh.description,
    plate: veh.plate,
  })); 
}


async getSingleVehicle(id: string): Promise<Vehicle> {
  const vehicle = await this.vehicleModel.findById(id).exec();
  if (!vehicle) {
    throw new NotFoundException('Could not find vehicle.');
  }
  return vehicle as Vehicle;
}


async updateVehicle(
  id: string,
  name: string,
  description: string,
  plate: string
) {
  const updatedVehicle = await this.vehicleModel.findById(id);
  console.log("ado",updatedVehicle);
  if (!updatedVehicle) {
    throw new NotFoundException('Could not find vehicle.');
  }
  if(!name && !description && !plate){
    return {
      success: false,
      error: "Name, Description and Plate are required."
    };
  }
  
  else if (!name) {
    return {
      success: false,
      error: "Name is required."
    };
  } else if(!description){
    return {
    success: false,
    error: "Description is required"
    }
  }else if(!plate){
    return {
      success: false,
      error: "Plate is required"
    }
  }else{
    updatedVehicle.name = name;
    updatedVehicle.description = description;
    updatedVehicle.plate = plate;
    updatedVehicle.save();

  return updatedVehicle;


}
}


async deleteVehicle(id: string) {
  const result = await this.vehicleModel.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    throw new NotFoundException('Could not find vehicle.');
  }else {
    return {
      success: true,
      message: "Vehicle deleted successfully."
    }
    
  }
}

  async findVehicle(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(id);
    if (!vehicle) {
      throw new NotFoundException('Could not find vehicle.');
    }
    return vehicle;
  }
  
  
  
}

