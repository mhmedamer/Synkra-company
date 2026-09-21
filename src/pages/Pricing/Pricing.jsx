/**------------------------------------------------------------------------
 *                           Import files and libraries
 *------------------------------------------------------------------------**/
import './Pricing.css';
import PricingHeader from './headerComponent/PricingHeader';
import PriceDetails from './pricingConatiner/PriceContainer';
import Questions from '../../components/questionsComponent/Questions';
import CtaSection from '../About/CTASection/CtaSection';
function Pricing() {
  return (
    <div className="pricing-page">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PricingHeader />
        <PriceDetails />
        <div style={{ width: '100%' }}>
          <Questions />
          <CtaSection />
        </div>
      </div>
    </div>
  );
}
export default Pricing;
