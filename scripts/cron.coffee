 # Description:
 #   Defines periodic executions
 
 module.exports = (robot) ->

  cronJob = require('cron').CronJob
  new cronJob('0 */1 * * * *', everyMinute(robot), null, true)

	everyMinute = (robot) ->
	  -> robot.messageRoom "#pegabottest", 'I will nag you every minute'

