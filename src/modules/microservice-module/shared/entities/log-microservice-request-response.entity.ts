import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EnumMicroserviceRequestForm {
  MainApi = 'MainApi',
}

export enum EnumMicroserviceRequestTo {
  FileUpload = 'FileUpload',
}
@Entity("_log_microservice")
export class LogMicroserviceRequestResponseEntity{
  @PrimaryGeneratedColumn("uuid")
  request_id: string;

  @Column({type: "varchar", length: 36})
  request_from_id: string;

  @Column({type: "enum", enum: EnumMicroserviceRequestForm, default: EnumMicroserviceRequestForm.MainApi})
  request_from: EnumMicroserviceRequestForm;

  @Column({type: "varchar"})
  request_key: string;

  @Column({type: "varchar"})
  request_to: string;

  @Column({type: "longtext", name: "client_request_json", nullable:true})
  client_request_json: string;

  @Column({type: "longtext", name: "client_get_response_json", nullable:true})
  client_get_response_json: string;

  @Column({type: "boolean", name: "client_get_response_status", nullable:true})
  client_get_response_status: boolean;

  @Column({type: "int", name: "client_get_response_code", nullable:true})
  client_get_response_code: number;

  @Column({type: "longtext", name: "host_get_request_json", nullable:true})
  host_get_request_json: string;

  @Column({type: "longtext", name: "host_response_json", nullable:true})
  host_response_json: string;

  @Column({type: "longtext", name: "host_internal_error_json", nullable:true})
  host_internal_error_json: string;

  @Column({type: "longtext", name: "host_internal_info_json", nullable:true})
  host_internal_info_json: string;

  @Column({type: "boolean", name: "host_response_status", nullable:true})
  host_response_status: boolean;

  @Column({type: "int", name: "host_response_status_code", nullable:true})
  host_response_status_code: number;

  @CreateDateColumn()
  created_at: Date

  @Column({type:'datetime', nullable:true})
  host_get_request_at: Date

  @Column({type:'datetime', nullable:true})
  host_response_at: Date

  @Column({type:'datetime', nullable:true})
  client_get_response_at: Date
}
