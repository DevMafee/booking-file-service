import { createClient } from "redis";

export class RedisConnector {
  private static instance: RedisConnector;
  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static async getInstance(): Promise<any> {
    if (!RedisConnector.instance) {
      const client = createClient();
      await client.connect();
      RedisConnector.instance = client;
    }
    return RedisConnector.instance;
  }

}