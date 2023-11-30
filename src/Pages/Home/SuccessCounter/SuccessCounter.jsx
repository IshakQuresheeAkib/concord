import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Heading from '../../../Components/Heading/Heading';
import Loader from '../../../Components/Loader/Loader';

const SuccessCounter = () => {

    const axiosSecure = useAxiosSecure();
    const {data = {},isPending} = useQuery({
        queryKey:['count'],
        queryFn:()=> axiosSecure.get('/biodatas-count')
    })

    const {totalBiodata,maleBiodata,femaleBiodata} = data.data || {}

    return (
        <div className="container mx-auto my-32 flex flex-col max-w-6xl gap-16 px-5">
        <div className="grid grid-cols-1 gap-32 lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-2 text-center lg:text-left">
                <Heading>Our Impact</Heading>
                <p className='text-center text-sm md:ml-8'>Making a Difference: Our Impact on Matrimonial Journeys</p>
            </div>
            {
              isPending ? <Loader></Loader>
              :
              <div
              className="grid w-full grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2"
            >
              <div className="flex flex-col items-start gap-1">
                <h3
                  className="text-4xl font-extrabold leading-tight text-dark-grey-900"
                >
                  <span id="countto1">{totalBiodata}</span>
                </h3>
                <h3
                  className="text-base font-bold leading-tight text-dark-grey-900"
                >
                  Total Biodatas
                </h3>
                <p className="text-base font-medium leading-7 text-dark-grey-600">
                Unlock a World of Possibilities: Explore Our Total Biodatas for Your Perfect Match.
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <h3
                  className="text-4xl font-extrabold leading-tight text-dark-grey-900"
                >
                  <span id="countto2">{maleBiodata}</span>
                </h3>
                <h3
                  className="text-base font-bold leading-tight text-dark-grey-900"
                >
                  Total Male Biodata
                </h3>
                <p className="text-base font-medium leading-7 text-dark-grey-600">
                Unlock a World of Possibilities: Explore Our Total Biodatas for Your Perfect Match.
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <h3
                  className="text-4xl font-extrabold leading-tight text-dark-grey-900"
                >
                  <span id="countto3" data-decimal="1">{femaleBiodata}</span>
                </h3>
                <h3
                  className="text-base font-bold leading-tight text-dark-grey-900"
                >
                  Total Female Biodata
                </h3>
                <p className="text-base font-medium leading-7 text-dark-grey-600">
                Unlock a World of Possibilities: Explore Our Total Biodatas for Your Perfect Match.
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <h3
                  className="text-4xl font-extrabold leading-tight text-dark-grey-900"
                >
                  <span id="countto4">18</span>+
                </h3>
                <h3
                  className="text-base font-bold leading-tight text-dark-grey-900"
                >
                  Total Marriages
                </h3>
                <p className="text-base font-medium leading-7 text-dark-grey-600">
                Making a Difference: Our Impact on Matrimonial Journeys
                </p>
              </div>
            </div>
            }
          </div>
          <div
            className="hidden rounded-2xl bg-[url('https://i.ibb.co/37LvS3H/closeup-shot-wedding-couple-hold.jpg')] bg-cover bg-center lg:block"
          ></div>
        </div>
      </div>
    )}
export default SuccessCounter;



