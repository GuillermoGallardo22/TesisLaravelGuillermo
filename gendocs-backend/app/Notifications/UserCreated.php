<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserCreated extends Notification
{
    use Queueable;

    protected User $sender;
    protected $tempPassword;

    /**
     * @param User $sender
     * @param $tempPassword
     */
    public function __construct(User $sender, $tempPassword)
    {
        $this->sender = $sender;
        $this->tempPassword = $tempPassword;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->from($this->sender->email, config('app.name'))
            ->subject(config('app.name') . " | " . "Bienvenido")
            ->markdown('emails.users.created', [
                'name' => $notifiable->name,
                'password' => $this->tempPassword,
                'url' => config('fortify.home')
            ]);
    }
}
