import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginRequest {
  @IsEmail()
  email: string;

  @Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message: (args) => {
        const val = args.value as string;
        if (val.length < 8 || val.length > 20) {
          return 'Password must be 8-20 characters';
        }
        return 'Password must contain at least 1 uppercase and lowercase characters, 1 number, and 1 special character';
      },
    },
  )
  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
