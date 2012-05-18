var AffiliateAPI = (function (parent) {

  //
  // Module Level Methods
  //

  parent.alert = function(notice) {
    alert(notice);
  }

  parent.navigateTo = function(url) {
    window.location = url;
  }

  //
  // GoDaddy Affiliate Links (via Commission Junction)
  //

  var goDaddy = parent.GoDaddy = parent.GoDaddy || {};

  goDaddy.__pid = null;         // global PID
  goDaddy.__sid = null;         // global SID, optional
  goDaddy.__isc = '0000000000'; // global ISC (Coupon Code)
  
  goDaddy.__linkHosts = ['www.tkqlhce.com', 'www.kqzyfj.com', 'www.jdoqocy.com', 'www.dpbolvw.net', 'www.anrdoezrs.net'];

  goDaddy.__linkHost = function() {
    return this.__linkHosts[Math.floor(Math.random()*this.__linkHosts.length)];
  }

  goDaddy.sid = function(sid) {
    if (!sid) {
      return this.__sid;

    } else {
      this.__sid = sid;

    }
  }

  goDaddy.__sidSuffix = function(sid) {
    if (!sid) {
      return '';
    } else {
      return '&sid=' + sid;
    }
  }

  goDaddy.pid = function(pid) {
    if (!pid) {
      if (!this.__pid) {
        parent.alert('goDaddy.pid() is undefined');
      }
      return this.__pid;

    } else {
      this.__pid = pid;

    }
  }

  goDaddy.isc = function(isc) {
    if (!isc) {
      if (!this.__isc) {
        parent.alert('goDaddy.isc() is undefined');
      }
      return this.__isc;

    } else {
      this.__isc = isc;

    }
  }
  
  goDaddy.whoisUrl = function(domain, options) {
    if (!options) {
      options = {};
    }

    return 'http://' + this.__linkHost() + '/click-' + (options['pid'] || this.pid()) + '-10388358?url=http%3A%2F%2Fwho.godaddy.com%2Fwhois.aspx%3Fdomain%3D' + domain + this.__sidSuffix(options['sid'] || this.sid());
  };

  goDaddy.whois = function(domain, sid) {
    parent.navigateTo(this.whoisUrl(domain, sid));
    return false;
  }

  goDaddy.registerUrl = function(domain, options) {
    if (!options) {
      options = {};
    }

    var components = domain.split('.');
    var domain     = components[0];
    var extension  = components[1];

    return 'http://' + this.__linkHost() + '/interactive?domainToCheck=' + domain + '&tld=' + extension + '&checkAvail=1&pid=' + (options['pid'] || this.pid()) + '&url=http%3A%2F%2Fwww.godaddy.com%2Fgdshop%2Fregistrar%2Fsearch.asp%3Fisc%3D' + (options['isc'] || this.isc()) + '&aid=10390987' + this.__sidSuffix(options['sid'] || this.sid());
  }

  goDaddy.register = function(domain, sid) {
    parent.navigateTo(this.registerUrl(domain, sid));
    return false;
  }


  return parent;

}(AffiliateAPI || {}));
