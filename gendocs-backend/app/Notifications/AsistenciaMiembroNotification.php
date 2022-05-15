<?php

namespace App\Notifications;

use App\Models\Consejo;
use App\Services\SenderEmailService;
use App\Traits\NotifiableUtils;
use App\Traits\ReplaceableDocText;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class AsistenciaMiembroNotification extends Notification
{
    use Queueable, ReplaceableDocText, NotifiableUtils;

    protected $mensaje;

    public function __construct($mensaje)
    {
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
        return (new MailMessage)
            ->from(
                $this->getSenderEmail(),
                $this->getSenderName()
            )
            ->subject($this->getSubject("Notificación asistencia"))
            ->greeting('Notificación asistencia')
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
