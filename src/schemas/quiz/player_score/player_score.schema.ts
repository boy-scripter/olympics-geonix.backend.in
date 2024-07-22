import { PLAYING_STATUS } from '@interface/quiz.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class PlayerScore extends Document {
 
 
    @Prop({ required: true, ref: "User", type: mongoose.Schema.Types.ObjectId })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, default: 0 })
    total_score: number;

    @Prop({ required: true, default: new Date(), type: Date })
    start_time: Date;

    @Prop({ type: Date })
    finished_time: Date;

    @Prop({ required: true, type: String, enum: PLAYING_STATUS, default: PLAYING_STATUS.STARTED })
    status: PLAYING_STATUS;
}

export const PlayerScoreSchema = SchemaFactory.createForClass(PlayerScore);
export const PLAYER_SCORE_MODEL = PlayerScore.name
