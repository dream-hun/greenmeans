<?php

namespace App\Models;

use Database\Factories\ContactEnquiryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string|null $company
 * @property string $email
 * @property string $phone
 * @property string|null $service
 * @property string|null $location
 * @property string $message
 * @property string|null $source
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name', 'company', 'email', 'phone', 'service', 'location', 'message', 'source'])]
class ContactEnquiry extends Model
{
    /** @use HasFactory<ContactEnquiryFactory> */
    use HasFactory;
}
