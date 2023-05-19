import {
  prop,
  index,
  modelOptions,
  getModelForClass,
} from '@typegoose/typegoose';

@index({ id: 1 })
@modelOptions({
  schemaOptions: {
    // Add createAt and updateAt fields
    timestamps: true,
  },
})
export class Todo {
  @prop({ required: true, unique: true })
  public id!: number;

  @prop({ required: true })
  public todo!: string;

  @prop({ default: false })
  public completed!: boolean;

  @prop()
  public userId!: number;
}

// Create the todo model
const todoModel = getModelForClass(Todo);
export default todoModel;
