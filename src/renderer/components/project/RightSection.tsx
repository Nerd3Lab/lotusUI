import BACKGROUND from '../../../../assets/img/project/bg.svg';
import OBJ1 from '../../../../assets/img/project/obj1.png'; // your floating cube image
import OBJ2 from '../../../../assets/img/project/obj2.png'; // another floating cube
import OBJ3 from '../../../../assets/img/project/obj3.png'; // another floating cube
import OBJ4 from '../../../../assets/img/project/obj4.png'; // another floating cube

export const RightSection = () => {
  return (
    <div className="w-full flex flex-col justify-end relative items-center bg-gray-950 rounded-[20px] overflow-hidden">
      <img
        src={BACKGROUND}
        alt="background"
        className="absolute h-full w-full object-cover"
      />
      <img
        src={OBJ1}
        alt="floating object 1"
        className="absolute top-0 left-0 animate-float-slow"
      />
      <img
        src={OBJ2}
        alt="floating object 2"
        className="absolute top-44 right-0 w-36 animate-float-medium"
      />
      <img
        src={OBJ3}
        alt="floating object 3"
        className="absolute bottom-56 left-32 animate-float-fast"
      />
      <img
        src={OBJ4}
        alt="floating object 4"
        className="absolute bottom-0 left-80 w-60 animate-float-medium animate-scale-bounce"
      />

      <div className="absolute w-full px-4 mb-6">
        <div className="bottom-0 p-5 rounded-xl project-right-side-text w-full text-white">
          <div className="text-5xl font-semibold">
            Simple. Beautiful. Powerful.
          </div>
          <p className="mt-6 text-3xl font-medium">
            The easiest way to test, airdrop, and explore your Sui local
            environment.
          </p>
        </div>
      </div>
    </div>
  );
};
