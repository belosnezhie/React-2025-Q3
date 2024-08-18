import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

import Header from '../../components/header/Header.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/StateHooks';
import { InputsData, SliceData } from '../../model/Model';
import { RootState } from '../../store/Store';
import { saveData } from '../../store/submittedDataSlice/SubmittedDataSlice';
import { Encoder } from '../../utils/encoding/Encoder';
import { getPasswordStrength, schema } from '../../utils/validation/Validation';

import '../FormPages.css';

const UncontrolledFormPage = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(
    (state: RootState) => state.countries.countries,
  );
  const formRef = useRef(null);
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmedPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [errorsMap, setErrorMap] = useState<Map<string, string>>(
    new Map<string, string>(),
  );
  const [passwordStrenth, setPasswordStrenth] = useState<string>();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: InputsData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmed_password: confirmedPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: Boolean(termsRef.current?.value) || false,
      image: imageRef.current?.files || new FileList(),
      country: countryRef.current?.value || '',
    };

    try {
      await schema
        .validate(data, {
          abortEarly: false,
        })
        .catch((error: ValidationError) => {
          error.inner.forEach((innerError) => {
            const temp = new Map<string, string>();

            if (innerError.path) {
              temp.set(innerError.path, innerError.message);
            }

            setErrorMap(temp);

            throw Error('Validation failed');
          });
        });

      const encoder = new Encoder(data);

      const copy: SliceData = await encoder.encode();

      dispatch(saveData(copy));

      navigate('/');
    } catch {
      //do nothing
    }
  };

  const countStrenth = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value || event.target.value === '') {
      const level = getPasswordStrength(event.target.value);

      setPasswordStrenth(level);
    }
  };

  return (
    <>
      <Header />
      <main className="page reactHookFormPage">
        <form
          onSubmit={onSubmit}
          className="form"
          autoComplete="off"
          ref={formRef}
        >
          <label htmlFor="name" className="lable">
            Name:
            <input type="text" id="name" ref={nameRef} />
          </label>
          <p className="error_message">{errorsMap.get('name')}</p>
          <label htmlFor="age" className="lable">
            Age:
            <input type="number" id="age" ref={ageRef} />
            <p className="error_message">{errorsMap.get('age')}</p>
          </label>
          <label htmlFor="email" className="lable">
            Email:
            <input type="emeil" id="email" ref={emailRef} />
          </label>
          <p className="error_message">{errorsMap.get('email')}</p>
          <label htmlFor="password" className="lable">
            Password:
            <input
              type="text"
              id="password"
              ref={passwordRef}
              onChange={countStrenth}
            />
          </label>
          <p className="error_message">{errorsMap.get('password')}</p>
          <div className="strenth_bar_container">
            Password strenth:
            <div className="strenth_bar">
              <div className={`value ${passwordStrenth}`}></div>
            </div>
          </div>
          <label htmlFor="confirmed_password" className="lable">
            Confirm password:
            <input
              type="text"
              id="confirmed_password"
              ref={confirmedPasswordRef}
            />
          </label>
          <p className="error_message">{errorsMap.get('confirmed_password')}</p>
          <label htmlFor="gender" className="lable">
            Gender:
            <select id="gender" ref={genderRef}>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <p className="error_message">{errorsMap.get('gender')}</p>
          <label htmlFor="t&c" className="lable terms">
            Accept Terms and Conditions:
            <input type="checkbox" id="t&c" ref={termsRef} />
          </label>
          <p className="error_message">{errorsMap.get('terms')}</p>
          <label htmlFor="image" className="lable">
            Choose a picture:
            <input
              type="file"
              id="image"
              ref={imageRef}
              className="file_input"
            />
          </label>
          <p className="error_message">{errorsMap.get('image')}</p>
          <label htmlFor="country" className="lable">
            Country:
            <input list="countries" id="country" ref={countryRef} />
            <datalist id="countries">
              {countries.map((item, index) => {
                return <option value={item} key={index}></option>;
              })}
            </datalist>
          </label>
          <p className="error_message">{errorsMap.get('country')}</p>
          <input type="submit" value="Submit" className="button" />
        </form>
      </main>
    </>
  );
};

export default UncontrolledFormPage;
