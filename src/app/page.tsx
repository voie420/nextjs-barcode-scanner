'use client';

import Webcam from 'react-webcam';
import Quagga from '@ericblade/quagga2';

import { useEffect, useRef, useState } from 'react';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const Home = () => {
  const webcam = useRef<Webcam>(null);

  const [attempts, setAttempts] = useState(0);
  const [scan, setScan] = useState(false);
  const [image, setImage] = useState<string | null | undefined>();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();

  const intervalRef = useRef<any>(null);
  useEffect(() => {
    if (scan) {
      intervalRef.current = setInterval(() => {
        if (!webcam?.current) return;

        const image = webcam.current.getScreenshot();

        if (!image) return;

        const warn = console.warn;
        console.warn = () => {};

        const callback = (result: any) => {
          console.warn = warn.bind(console);
          const code = result?.codeResult?.code;
          if (code) {
            setResult(code);
            setImage(image);
          }
        };

        Quagga.decodeSingle(
          {
            src: image as string,
            decoder: {
              readers: ['code_128_reader'],
            },
            debug: false,
          },
          callback,
        );

        setAttempts((prevAttempts) => prevAttempts + 1);
      }, 250);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setAttempts(0);
      intervalRef.current = null;
    }
  }, [scan]);

  return (
    <main className="flex w-full h-full flex-col items-center p-8 gap-4 text-white">
      <Webcam
        ref={webcam}
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        onUserMediaError={(e) => {
          if (e) setError('Could not find your Camera.');
        }}
        videoConstraints={videoConstraints}
        controls={false}
        className="aspect-video rounded-xl flex w-full max-w-[500px]"
      ></Webcam>
      <button
        onClick={() => setScan(!scan)}
        className={`rounded-xl px-4 py-2 ${
          scan ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        {scan ? 'Stop' : 'Start'} scanning
      </button>
      <p>
        <strong>Attempts:</strong> {attempts && attempts}
      </p>
      {error && <h1 className="text-lg text-red-500">{error}</h1>}
      {image && (
        <img
          src={image}
          alt="404"
          className="aspect-video rounded-xl flex w-full max-w-[500px]"
        ></img>
      )}
      {result && <strong>{result}</strong>}
    </main>
  );
};

export default Home;
