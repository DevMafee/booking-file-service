import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    fs.readdir(process.cwd() + '/files/temp', function (err, files) {
      const currentDate = new Date();
      Array.isArray(files) &&
        files.forEach((file) => {
          const mainFileName = file.split('-');
          const fileTime = parseInt(mainFileName[0]) - 20000;
          if (
            currentDate.getTime() - fileTime >
            (parseInt(process.env.TEMP_FILE_ALLOW_MINUTES) || 5) * 60 * 1000
          ) {
            fs.unlinkSync(process.cwd() + '/files/temp/' + file);
          }
        });
    });
  }
}
