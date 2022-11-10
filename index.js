/**
 * @file mofron-comp-signin/index.js
 * @brief component module template for developper
 * @license MIT
 */
const Text      = require('mofron-comp-text');
const HrzCenter = require('mofron-layout-hrzcenter');
const loMargin  = require('mofron-layout-margin');
const Click     = require('mofron-event-click');
const ErrMsg    = require('mofron-comp-errmsg');
const Input     = require('mofron-comp-input');
const Button    = require('mofron-comp-button');
const comutl    = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("Signin");
	    this.shortForm("locale");
            
	    /* init config */
            this.confmng().add('buttonEvent', { type: 'event', list: true });
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
	    this.layout([new loMargin('top', '0.15rem')]);
            
	    this.errmsg().width('100%');
            this.username().config({ label: 'Username: ', width: '100%' });
            this.password().config({ label: 'Password: ', width: '100%' });
	    this.forget().text('forgot your password ?');
            this.button().config({ text: 'Sign in', width: '100%' });
            
	    this.child([
                this.errmsg(), this.username(), 
	        this.password(), this.forget(), this.button()
	    ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    locale () {

    }

    errmsg (prm) {
        try {
            if ('string' === typeof prm) {
	        if (60 < prm.length) {
                    this.errmsg().height("0.8rem");
		} else {
                    this.errmsg().height("0.5rem");
		}
	        this.errmsg().text(prm);
		this.errmsg().visible(true);
                return;
	    }
	    return this.innerComp('errmsg', prm, ErrMsg);
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    username (prm) {
        try {
            if ('string' === typeof prm) {
                this.username().label(prm);
                return;
            } else if (true === comutl.iscmp(prm)) {
                prm.size('100%','0.35rem');
	    }
            return this.innerComp('username', prm, Input);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    password (prm) {
        try {
            if ('string' === typeof prm) {
                this.password().label(prm);
                return;
            } else if (true === comutl.iscmp(prm)) {
                prm.size('100%','0.35rem');
		prm.type('password');
            }
            return this.innerComp('password', prm, Input);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    forget (prm) {
        try {
            if (true === comutl.iscmp(prm)) {
                prm.config({
                    mainColor: 'blue',
		    event: new Click(() => {})
                });
            }
            return this.innerComp('forget', prm, Text);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    button (prm) {
        try {
            if ('string' === typeof prm) {
                this.button().text(prm);
                return;
            } else if (true === comutl.iscmp(prm)) {
                prm.clickEvent(this.checkValue,this);
		prm.height('0.3rem');
		prm.style(
		    { 'margin-top': '0.25rem' },
		    { lock: true }
		);
	    }
            return this.innerComp('button', prm, Button);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    checkValue (p1,p2,p3) {
        try {
            let pwd_1   = p3.password().value();
            let chk_ret = false;
	    if (null === p3.username().value()) {
	        p3.errmsg().text('please enter the username.');
            } else if (null === pwd_1) {
                p3.errmsg().text('please enter the password.');
            } else {
                chk_ret = true;
	    }
            
            p3.errmsg().visible(!chk_ret);
            let btn_evt = p3.buttonEvent();
            for (let idx in btn_evt) {
                btn_evt[idx][0](this, chk_ret, btn_evt[idx][1]);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    buttonEvent (fnc,prm) {
        try {
            return this.confmng('buttonEvent', (undefined === fnc) ? undefined : [fnc,prm]);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
