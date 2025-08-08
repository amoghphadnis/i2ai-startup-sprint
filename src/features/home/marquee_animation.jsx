import React from "react";
import Marquee from "react-fast-marquee";

export default function marquee_animation() {
  return (
    <Marquee className="marquee-container">
      <section className="metricsSection">
      <div className="metricsGrid">
        <div className="metricCard">
          <div className="metricNum">Upto $225K</div>
          <div className="metricLabel">Worth of benefits</div>
        </div>
        <div className="metricCard">
          <div className="metricNum">98</div>
          <div className="metricLabel">Point multi-layered evaluation</div>
        </div>
        <div className="metricCard">
          <div className="metricNum">35%+</div>
          <div className="metricLabel">Improvement in assessments</div>
        </div>
        <div className="metricCard">
          <div className="metricNum">60%+</div>
          <div className="metricLabel">Higher funding success</div>
        </div>
      </div>
      </section>
    </Marquee>
  );
}
