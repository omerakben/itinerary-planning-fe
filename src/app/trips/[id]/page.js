'use client';

import { getSingleTrip } from '@/api/tripsData';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ViewTrip({ params }) {
  const [tripDetails, setTripDetails] = useState({});
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    getSingleTrip(id).then(setTripDetails);
  }, [id]);

  const travelModeIcon = (mode) => {
    switch (mode) {
      case 'Automobile':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
            <path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z" />
          </svg>
        );
      case 'Plane':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
            <path d="m397-115-99-184-184-99 71-70 145 25 102-102-317-135 84-86 385 68 124-124q23-23 57-23t57 23q23 23 23 56.5T822-709L697-584l68 384-85 85-136-317-102 102 26 144-71 71Z" />
          </svg>
        );
      case 'Walking':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
            <path d="m280-40 112-564-72 28v136h-80v-188l202-86q14-6 29.5-7t29.5 4q14 5 26.5 14t20.5 23l40 64q26 42 70.5 69T760-520v80q-70 0-125-29t-94-74l-25 123 84 80v300h-80v-260l-84-64-72 324h-84Zm260-700q-33 0-56.5-23.5T460-820q0-33 23.5-56.5T540-900q33 0 56.5 23.5T620-820q0 33-23.5 56.5T540-740Z" />
          </svg>
        );
      case 'Train':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
            <path d="M160-340v-380q0-53 27.5-84.5t72.5-48q45-16.5 102.5-22T480-880q66 0 124.5 5.5t102 22q43.5 16.5 68.5 48t25 84.5v380q0 59-40.5 99.5T660-200l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-340Zm320-460q-106 0-155 12.5T258-760h448q-15-17-64.5-28.5T480-800ZM240-560h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM340-320q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm280 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm-320 40h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-480h226-448 222Z" />
          </svg>
        );
      default:
        return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="flex items-center text-2xl font-semibold text-gray-900">
            {/* suitcase icon */}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
              <path d="M140-120q-24.75 0-42.37-17.63Q80-155.25 80-180v-480q0-24.75 17.63-42.38Q115.25-720 140-720h180v-100q0-24.75 17.63-42.38Q355.25-880 380-880h200q24.75 0 42.38 17.62Q640-844.75 640-820v100h180q24.75 0 42.38 17.62Q880-684.75 880-660v480q0 24.75-17.62 42.37Q844.75-120 820-120H140Zm240-600h200v-100H380v100Zm-133 60H140v480h107v-480Zm407 480v-480H307v480h347Zm60-480v480h106v-480H714ZM480-425Z" />
            </svg>
            {tripDetails.destination}
          </h3>
          <p className="mt-1 max-w-2xl text-1xltext-gray-500"> {/* secondary text line */}</p>
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="flex items-center text-1xlfont-medium text-gray-900">
                {/* flight takeoff icon */}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                  <path d="M120-120v-80h720v80H120Zm70-200L40-570l96-26 112 94 140-37-207-276 116-31 299 251 170-46q32-9 60.5 7.5T864-585q9 32-7.5 60.5T808-487L190-320Z" />
                </svg>
                Arriving
              </dt>
              <dd className="mt-1 text-1xltext-gray-700 sm:col-span-2 sm:mt-0">{tripDetails.start_date}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="flex items-center text-1xlfont-medium text-gray-900">
                {/* flight landing icon */}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                  <path d="M120-120v-80h720v80H120Zm622-202L120-499v-291l96 27 48 139 138 39-35-343 115 34 128 369 172 49q25 8 41.5 29t16.5 48q0 35-28.5 61.5T742-322Z" />
                </svg>
                Returning
              </dt>
              <dd className="mt-1 text-1xltext-gray-700 sm:col-span-2 sm:mt-0">{tripDetails.end_date}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="flex items-center text-1xlfont-medium text-gray-900">
                {/* mode of travel icon */}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                  <path d="M480-80Q315-220 237.5-339T160-570q0-137 96.5-223.5T480-880q127 0 223.5 89T800-552l84-84 56 56-180 180-180-180 56-56 84 84q0-109-69.5-178.5T480-800q-101 0-170.5 67T240-569q0 83 59 177t181 206q20-18 37-35l34-34q-5-11-8-22t-3-23q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29q-8 0-14.5-1t-13.5-3q-29 30-61.5 61T480-80Z" />
                </svg>
                Via
              </dt>
              {/* The ? checks if the user exists before attempting to get the bio, to return undefined instead of an error; ex: tripDetails.user?.bio */}
              <dd className="flex items-center mt-1 text-1xltext-gray-700 sm:col-span-2 sm:mt-0">
                {travelModeIcon(tripDetails.mode_of_travel?.type_of_travel)}
                {tripDetails.mode_of_travel?.type_of_travel}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="flex items-center text-1xlfont-medium text-gray-900">
                {/* person icon */}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
                With {tripDetails.number_of_travelers} travelers:
              </dt>
              <dd className="mt-1 text-1xltext-gray-700 sm:col-span-2 sm:mt-0">{tripDetails.people_on_trip}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="flex items-center text-1xlfont-medium text-gray-900">
                {/* notes icon */}
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                  <path d="M280-280h84l240-238-86-86-238 238v86Zm352-266 42-44q6-6 6-14t-6-14l-56-56q-6-6-14-6t-14 6l-44 42 86 86ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm280-590q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
                </svg>
                Notes
              </dt>
              <dd className="mt-1 text-1xltext-gray-700 sm:col-span-2 sm:mt-0">{tripDetails.notes}</dd>
            </div>
          </dl>
        </div>
      </div>

      <button type="button" onClick={() => router.push(`/trips/edit/${tripDetails.id}`)} className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 hover:text-gray-900 transition-colors">
        Edit
      </button>
    </div>
  );
}

ViewTrip.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
