import React from "react";

export interface AblaufStep {
  number?: string | null;
  title?: string | null;
  text?: string | null;
}

export interface AblaufProps {
  eyebrow?: string | null;
  heading?: string | null;
  steps?: Array<AblaufStep | null> | null;
}

export const Ablauf: React.FC<AblaufProps> = ({ eyebrow, heading, steps }) => {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          {eyebrow && (
            <p className="text-bordeaux font-semibold uppercase tracking-[0.18em] text-sm mb-3">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-ink leading-tight">
              {heading}
            </h2>
          )}
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps?.map((step, index) => (
            <div key={index} className="relative">
              <span className="font-serif text-5xl font-bold text-bordeaux/20">
                {step?.number}
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink mt-2">
                {step?.title}
              </h3>
              <p className="mt-2 text-stone">{step?.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
