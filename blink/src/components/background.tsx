'use client'; // Required since this component uses client-side features

import Image from "next/image";

export function Background() {
  return (
      <Image
        src="/test4.jpg"
        alt="A car illustration"
        width={1800}
        height={600}
        className="rounded-3xl glow-shadow object-cover"
      />
  );
}