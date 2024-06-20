
export interface IMessageLocals{
    type: string;
    message: string;
    timestamp: Date;
    title: string;
}

export interface SocketApi{
    sendNotification (
        template: string,
        receiver: string,
        locals: IMessageLocals
    ): Promise<void>
}