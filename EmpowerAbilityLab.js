//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like

'use strict';

var defaultService = "home"


class TabsManual {
  constructor(groupNode) {
    console.log(111)
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    var selectedObj = null
    var service = location.hash.replace('#', '').trim();

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
      if (service === tab.getAttribute("id")){
        selectedObj = tab
      }
      
    }
    if (selectedObj == null) {
      selectedObj = this.firstTab
    }

    this.setSelectedTab(selectedObj);

    window.addEventListener('hashchange', () => {
      var service = location.hash.replace('#', '');
      console.log("hashchange, service = ",service)
      if (service) {
        for (var i = 0; i < this.tabs.length; i += 1) {
          var tab = this.tabs[i]
          if (service === tab.getAttribute("id")){
            this.setSelectedTab(tab)
          }
        }
      }
    });
  }

  

  setSelectedTab(currentTab) {
    for (var i = 0; i < this.tabs.length; i += 1) {
        var tab = this.tabs[i];
        var panel = this.tabpanels[i];

        if (currentTab === tab) {
            //Update tab attributes
            tab.setAttribute('aria-selected', 'true');
            tab.removeAttribute('tabindex');

            //Show panel
            panel.classList.remove('is-hidden');
            panel.setAttribute('aria-hidden', 'false');

            //Update document title
            var heading = panel.querySelector("h1");
            if (heading) {
                document.title = heading.textContent;
            }

            //Make panel focusable and move focus
            if (!panel.hasAttribute('tabindex')) {
                panel.setAttribute('tabindex', '0');
            }
            panel.focus();
        } else {
            //Deselect other tabs
            tab.setAttribute('aria-selected', 'false');
            tab.tabIndex = -1;

            //Hide other panels
            panel.classList.add('is-hidden');
            panel.setAttribute('aria-hidden', 'true');
        }
    }
}

  moveFocusToTab(currentTab) {
    currentTab.focus();
  }

  moveFocusToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.moveFocusToTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index - 1]);
    }
  }

  moveFocusToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.moveFocusToTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.moveFocusToTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.moveFocusToTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.moveFocusToTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // Since this example uses buttons for the tabs, the click onr also is activated
  // with the space and enter keys
  onClick(event) {
    location.hash = event.currentTarget.getAttribute("id");
    // this.setSelectedTab(event.currentTarget);
  }
}
var defaultService = "home"
// Initialize tablist

//Terry changes goes here

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].manual');
  for (var i = 0; i < tablists.length; i++) {
    new TabsManual(tablists[i]);
  }

  //// ADDED CODE START — MODAL FUNCTIONALITY ////

  const modal = document.getElementById("communityModal");
  const openBtn = document.getElementById("openCommunityModal");
  const closeBtn = document.getElementById("closeCommunityModal");

  openBtn.addEventListener("click", () => {
    modal.classList.remove("is-hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("is-hidden");
  });

  //// ADDED CODE END ////

  //// ADDED CODE START — SWITCH BEHAVIOR ////

  const switchImg = document.getElementById("switchImage");
  const switchInput = document.getElementById("receiveUpdates");

  switchImg.addEventListener("click", () => {
    switchInput.checked = !switchInput.checked;

    switchImg.src = switchInput.checked
      ? "./images/switch-on.png"
      : "./images/switch-off.png";
  });

  //// ADDED CODE END ////

  //// ADDED CODE START — SHOW/HIDE TEXTAREA ////

  const speakerCheckbox = document.getElementById("check2");
  const eventSection = document.getElementById("eventSection");

  eventSection.classList.add("is-hidden");

  speakerCheckbox.addEventListener("change", () => {
    if (speakerCheckbox.checked) {
      eventSection.classList.remove("is-hidden");
    } else {
      eventSection.classList.add("is-hidden");
    }
  });

  //// ADDED CODE END ////
});

