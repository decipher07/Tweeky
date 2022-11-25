import mongoose from 'mongoose';
import Logging from '../logger/logging';
import { config } from '../config/config'

export default mongoose.connect( config.database.url, { 
    retryWrites: true,
    w: 'majority'
});