import React, {useState} from 'react'
import ProviderModal from "./ProviderModal";

  function Header() {
      const [showProviderLookupModal, setShowProviderLookupModal] = useState(false);
      const handleProviderLookupClose = () => setShowProviderLookupModal(false);
      const handleProviderLookupShow = () => setShowProviderLookupModal(true);

      return (
          <div id="wrapper" >
              <header>
                  <div className="page-holder">
                      <div className="logo"><a href="https://sanabenefits.com"> <img src="https://sanabenefits.com/wp-content/themes/sana-benefits/images/logo.png" srcSet="https://sanabenefits.com/wp-content/themes/sana-benefits/images/logo@2x.png 2x" alt="" width={87} height={18} /> </a></div>
                      <div className="h-box">
                          <ul id="nav">
                              <li id="menu-item-849" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-849">
                                  <a href="#">Employers</a>
                                  <ul className="sub-menu">
                                      <li id="menu-item-574" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-574"><a href="https://sanabenefits.com/plans/">Plans</a></li>
                                      <li id="menu-item-510" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-510"><a href="https://sanabenefits.com/why-sana/">Why Sana</a></li>
                                      <li id="menu-item-229" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-229"><a target="_blank" rel="noopener" href="https://sanabenefits.zendesk.com/hc/en-us/categories/360001451351">Help
                                          Center</a></li>
                                  </ul>
                              </li>
                              <li id="menu-item-852" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-852">
                                  <a href="#">Members</a>
                                  <ul className="sub-menu">
                                      <li id="menu-item-851" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-851"><a target="_blank" rel="noopener" href="https://secure.sanabenefits.com/">Log In</a>
                                      </li>
                                      <li id="menu-item-804" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-804"><a target="_blank" rel="noopener" href="https://sanabenefits.zendesk.com/hc/en-us/categories/360001462752">Help
                                          Center</a></li>
                                      <li id="menu-item-853" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-853"><a target="_blank" rel="noopener" href="https://sana.referralrock.com/v2/2/register">Referral
                                          Program</a></li>
                                  </ul>
                              </li>
                              <li id="menu-item-854" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-854">
                                  <a href="#">Brokers</a>
                                  <ul className="sub-menu">
                                      <li id="menu-item-855" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-855"><a href="/brokers/">Brokers Overview</a></li>
                                      <li id="menu-item-856" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-856"><a href="https://sanabenefits.com/plans/">Plans</a></li>
                                  </ul>
                              </li>
                              <li id="menu-item-918" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-918"><a href="https://sanabenefits.com/healthcare-providers/">Providers</a></li>
                              <li id="menu-item-858" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-858">
                                  <a href="#">Resources</a>
                                  <ul className="sub-menu">
                                      <li id="menu-item-859" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-859"><a href="/blog/">Blog</a></li>
                                      <li id="menu-item-860" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-860"><a target="_blank" rel="noopener" href="https://sanabenefits.zendesk.com/hc/en-us">Help
                                          Center</a></li>
                                      <li id="menu-item-862" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-862"><a target="_blank" rel="noopener" href="https://sana.referralrock.com/v2/2/register">Referral
                                          Program</a></li>
                                      <li id="menu-item-1078" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1078"><a href="https://sanabenefits.com/testimonials/">Testimonials</a></li>
                                  </ul>
                              </li>
                          </ul>
                          <ul className="top-add-nav">
                              <li><a className="q-quote" href="https://sanabenefits.com/get-quote/">Get Quote</a></li>
                              <li><a className="provider-lookup" href='javascript:void(0)' onClick={handleProviderLookupShow}>Provider Lookup</a></li>
                              <li><a className="login" href="https://secure.sanabenefits.com/" target="_blank">Log In</a></li>
                          </ul>
                          <a href="#" className="m-nav-link" /></div>
                  </div>
              </header>
              <ProviderModal show={showProviderLookupModal} handleClose={handleProviderLookupClose}/>
          </div>
  );
  }

export default Header