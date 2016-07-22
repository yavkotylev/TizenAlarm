/*
 *      Copyright (c) 2016 Samsung Electronics Co., Ltd
 *
 *      Licensed under the Flora License, Version 1.1 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *              http://floralicense.org/license/
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 */

/*global tau */
/*jshint unused: vars*/





(function(tau) {
    var page,
        elScroller,
        list,
        listHelper = [],
        snapList = [],
        i,
        len;

    if (tau.support.shape.circle) {
        document.addEventListener("pagebeforeshow", function(e) {
            page = e.target;
            elScroller = page.querySelector(".ui-scroller");
              /**
             * If elScroller existed, set 'tizen-circular-scrollbar' attribute
               */
            if (elScroller) {
                list = elScroller.querySelectorAll(".ui-listview");
                if (list) {
                    if (page.id !== "pageMarqueeList" && page.id !== "pageTestVirtualList" && page.id !== "pageAnimation") {
                        len = list.length;
                        for (i = 0; i < len; i++) {
                            listHelper[i] = tau.helper.SnapListStyle.create(list[i]);
                        }
                        len = listHelper.length;
                        if (len) {
                            for (i = 0; i < len; i++) {
                                snapList[i] = listHelper[i].getSnapList();
                            }
                        }
                    }
                }
            }
        });

        document.addEventListener("pagebeforehide", function(e) {
            len = listHelper.length;
            if (len) {
                for (i = 0; i < len; i++) {
                    listHelper[i].destroy();
                }
                listHelper = [];
            }
        });
    }
}(tau));


function setAlarm(){
	var hour = document.getElementById("hourAlarm").innerHTML;
    var minute = document.getElementById("minuteAlarm").innerHTML;
    var s = "AM";
    if (parseInt(hour) > 11){
    	s = "PM";
    }
    var mainPageText = document.getElementById("alarmList").innerHTML;
    mainPageText = mainPageText.slice(0, -5);
    
    var addStr = '<li class="li-has-multiline li-has-toggle"><label><div class="alarm-list "><div class="time-container">';
    addStr = addStr + '<span class="time">' + hour + ':' + minute +'</span><span class="ampm">' + s + '</span></div>';
    addStr = addStr + '<div class="li-text-sub ui-li-sub-text date-container"><span class="normal">Wed, 7 May</span></div></div>';
    addStr = addStr + '<div class="ui-toggleswitch"><input type="checkbox" class="ui-switch-input" style="background-color: rgba(112,186,15,1);"><div class="ui-switch-button"></div></div>';
    addStr = addStr + '</label></li></ul>';
    
    document.getElementById("alarmList").innerHTML = mainPageText + addStr;
    tau.changePage("#main-page");
    var d = new Date();
    console.log(d.getTime());
    d.setSeconds(d.getSeconds() + 4);
    console.log(d.getTime());
    var alarm = new tizen.AlarmAbsolute(d);
    var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/alarm", "index.html");
	tizen.alarm.add(alarm, tizen.application.getCurrentApplication().appInfo.id, appControl);
    //alert("asdf");
    //alert("The alarm will trigger at " + alarm.getRemainingSeconds() + " later");
    
}

