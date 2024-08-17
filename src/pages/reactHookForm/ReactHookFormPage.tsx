import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
import { InputsData, SliceData } from '../../model/Model';
import { RootState } from '../../store/Store';
import { saveData } from '../../store/submittedDataSlice/SubmittedDataSlice';
import { Encoder } from '../../utils/encoding/Encoder';
import { schema } from '../../utils/validation/Validation';

import './ReactHookFormPage.css';

const ReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const dispatch = useAppDispatch();
  const countries = useAppSelector(
    (state: RootState) => state.countries.countries,
  );
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<InputsData> = async (data) => {
    console.log(data);

    const encoder = new Encoder(data);

    const copy: SliceData = await encoder.encode();

    dispatch(saveData(copy));

    navigate('/');
  };

  return (
    <>
      <Header />
      <main className="page reactHookFormPage">
        <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
          <label htmlFor="name" className="lable">
            Name:
            <input type="text" id="name" {...register('name')} />
          </label>
          <p className="error_message">{errors.name?.message}</p>
          <label htmlFor="age" className="lable">
            Age:
            <input type="number" id="age" {...register('age')} />
            <p className="error_message">{errors.age?.message}</p>
          </label>
          <label htmlFor="email" className="lable">
            Email:
            <input
              type="emeil"
              id="email"
              defaultValue=""
              {...register('email')}
            />
          </label>
          <p className="error_message">{errors.email?.message}</p>
          <label htmlFor="password" className="lable">
            Password:
            <input
              type="text"
              id="password"
              defaultValue=""
              {...register('password')}
            />
          </label>
          <p className="error_message">{errors.password?.message}</p>
          <label htmlFor="confirmed_password" className="lable">
            Confirm password:
            <input
              type="text"
              id="confirmed_password"
              defaultValue=""
              {...register('confirmed_password')}
            />
          </label>
          <p className="error_message">{errors.confirmed_password?.message}</p>
          <label htmlFor="gender" className="lable">
            Gender:
            <select id="gender" {...register('gender')} required={true}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <p className="error_message">{errors.gender?.message}</p>
          <label htmlFor="t&c" className="lable terms">
            Accept Terms and Conditions:
            <input type="checkbox" id="t&c" {...register('terms')} />
          </label>
          <p className="error_message">{errors.terms?.message}</p>
          <label htmlFor="image" className="lable">
            <input type="file" id="image" {...register('image')} />
          </label>
          <p className="error_message">{errors.image?.message}</p>
          <label htmlFor="country" className="lable">
            Country:
            <input list="countries" id="country" {...register('country')} />
            <datalist id="countries">
              {countries.map((item, index) => {
                return <option value={item} key={index}></option>;
              })}
            </datalist>
          </label>
          <p className="error_message">{errors.country?.message}</p>
          <input type="submit" value="Submit" className="button" />
        </form>
      </main>
    </>
  );
};

export default ReactHookFormPage;
