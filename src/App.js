
import './App.css';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState([]);
  const [gender, setGender] = useState([])
  const [nationality, setNationality] = useState([])
  const GENDER_API = `https://api.genderize.io/?name=${search}`
  const NATIONALITY_API = `https://api.nationalize.io/?name=${search}`

  const handleSubmit = () => {


    fetch(GENDER_API)
      .then(response => response.json())
      .then(response => setGender(response))
      .catch(err => console.error(err));
    fetch(NATIONALITY_API)
      .then(response => response.json())
      .then(response => setNationality(response))
      .catch(err => console.error(err));

  }


  return (
    <>
      <div className="App">
        <header className='App-header'>

          <div className="w-1/3">
            <div className="bg-white rounded flex p-3">
              <input type="text" name=""
                placeholder='Enter Your Name'
                className='w-full text-black border p-2 '
                onChange={(e) => setSearch(e.target.value)} />
              <input type="submit" className=' text-black bg-red-400 rounded-md p-2 '
                onClick={() => handleSubmit()} />
            </div>
            {
              (gender.length !== 0 &&
                <div className="table w-full mt-3">
                  <table className="table w-full border rounded-md">
                    <tbody className='border rounded-md'>
                      <tr className='border'>
                        <th className='border'>Name</th>
                        <td className='border'>{gender.name}</td>
                      </tr>

                      <tr className='border'>
                        <th className='border'>Gender</th>
                        <td className='border'>{gender.gender}</td>
                      </tr>
                        {
                        nationality.country.map((index, key) => {
                          let prob = index.probability
                          return (
                            <tr className='border' key={key} >
                              <th className='border'>Nationality and probability {key + 1} </th>
                              <td className='border'>{index.country_id}, {prob.toPrecision(2)}%</td>
                            </tr>)
                        }
                        )
                      }
                    </tbody>
                  </table>
                </div>)
            }

          </div>

        </header>

      </div>
    </>
  );
}

export default App;
