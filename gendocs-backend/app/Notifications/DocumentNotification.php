<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DocumentNotification extends Notification
{
    use Queueable;

    protected User $sender;
    protected $mensaje;

    /**
     * @param User $sender
     * @param $mensaje
     */
    public function __construct(User $sender, $mensaje)
    {
        $this->sender = $sender;
        $this->mensaje = $mensaje;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $sender = $this->sender->name;
        $app = config('app.name');

        return (new MailMessage)
            ->from(env("MAIL_FROM_ADDRESS"))
            ->subject(config('app.name') . " | " . "Notificación documento")
            ->greeting('Notificación documento')
            ->markdown('emails.estudiantes.documento', [
                'mensaje' => $this->mensaje,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
