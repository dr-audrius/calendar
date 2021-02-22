$(document).ready(function () {

  var eventClasses;
  var eventCount;

  $("#calendar").datepicker({

    beforeShowDay: function (date) {

      eventClasses = [];
      eventCount = 0;

      var weekday = date.getDay();
      var date = date.getDate();

      //standup 
      if (weekday == 1 || weekday == 2 || weekday == 3 || weekday == 4 || weekday == 5) {  eventClasses.push("standUp"); eventCount++; } 
      //planningMeeting
      if ((weekday == 1 && date <= 7) || (weekday == 1 && date > 14 && date <= 21)) { eventClasses.push("planningMeeting"); eventCount++; } 
      //demoMeeting
      if ((weekday == 5 && date + 3 <= 7) || (weekday == 5 && date + 3 > 14 && date + 3 <= 21)) {  eventClasses.push("demoMeeting"); eventCount++; } 

      switch (eventCount) {
        case 1:
          eventCountText = "one";
          break;
        case 2:
          eventCountText = "two";
          break;
        case 3:
          eventCountText = "three";
          break;
        default:
          eventCountText = "one";
      }

      eventClasses.push(eventCountText);


      return [true, eventClasses.join(" ").trim()] 
    }
  });


  function addColorInCalendar(howManyEvent) {

    $(howManyEvent).each(function (index, value) {

      var $this = $(this);
      var $classList = $this.attr('class').split(/\s+/);

      var classListColor = $.map($classList, function (eventClassValue, index) {

        var colorValue;

        switch (eventClassValue) {
          case "standUp":
            colorValue = "blue";
            break;
          case "planningMeeting":
            colorValue = "green";
            break;
          case "demoMeeting":
            colorValue = "yellow";
            break;
          case "firstMonday":
            colorValue = "red";
            break;
          default:
            colorValue = "white";
        }

        return {
          Key: eventClassValue,
          Value: colorValue
        }

      });


      switch (howManyEvent) {
        case ".two":
          $this.children("a").css({
            background: "-webkit-linear-gradient( -28deg, " + classListColor[1].Value + " 0%, " + classListColor[1].Value + " 60%, " + classListColor[2].Value + " 60%, " + classListColor[2].Value + " 60%)"
          });
          break;
        case ".one":
          $this.children("a").css({
            background: classListColor[1].Value
          });
          break;
        case ".three":
          $this.children("a").css({
            background: "-webkit-linear-gradient(-28deg, " + classListColor[1].Value + " 33%," + classListColor[2].Value + " 33%, " + classListColor[2].Value + " 66%, " + classListColor[3].Value + " 66%)"
          });
          break;
        default:
          colorValue = "white";
      }

    });

  }

  function todo() {
    addColorInCalendar('.two');
    addColorInCalendar('.one');
    addColorInCalendar('.three');
  }

  todo();


  $(document).delegate("a[title='Next']", 'click', todo );
  $(document).delegate("a[title='Prev']", 'click', todo );

});


