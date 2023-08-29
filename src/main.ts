import { fileServiceMicroserviceBootstrap } from './servers/microservice-server';
import { readServerBootstrap } from './servers/read-server';
import { writeServerBootstrap } from './servers/write-server';

readServerBootstrap();
writeServerBootstrap();
fileServiceMicroserviceBootstrap();
