import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    VehicleModule,
    MongooseModule.forRoot(
      'Add you Mongo DB connection string here.' // Add your connection string here
      ), 
   ],
})
export class AppModule {}