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

class AsistenciaMiembroNotification extends Notification implements ShouldQueue
{
    use Queueable, ReplaceableDocText, NotifiableUtils;

    public $tries = 3;

    protected $mensaje;
    protected $sender;

    public function __construct($mensaje, $sender)
    {
        $this->mensaje = $mensaje;
        $this->sender = $sender;
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
            ->from(env("MAIL_FROM_ADDRESS"))
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

    /**
     * Determine the notification's delivery delay.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function withDelay($notifiable)
    {
        return [
            'mail' => now()->addSeconds(30),
        ];
    }

    /**
     * Determine the time at which the job should timeout.
     *
     * @return \DateTime
     */
    public function retryUntil()
    {
        return now()->addMinutes(5);
    }
}
