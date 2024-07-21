import { SCORE_STATUS } from '@interface/quiz.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema()
export class PlayerScore extends Document {

    @Prop({ required: true, ref: "User", type: mongoose.Schema.Types.ObjectId })
    userid: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, default: 0 })
    total_score: number;

    @Prop({ required: true, default: new Date(), type: Date })
    start_time: Date;

    @Prop({ required: true, type: Date })
    finished_time: Date;

    @Prop({ required: true, type: String, enum: SCORE_STATUS })
    status: SCORE_STATUS;
}

export const PlayerScoreSchema = SchemaFactory.createForClass(PlayerScore);
export const PLAYER_MODEL = PlayerScore.name
