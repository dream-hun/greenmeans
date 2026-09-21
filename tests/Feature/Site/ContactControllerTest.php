<?php

use App\Models\ContactEnquiry;

test('an enquiry is stored and the visitor stays on the page', function () {
    $response = $this->from(route('contact'))->post(route('contact.store'), [
        'name' => 'Aline Uwase',
        'company' => 'Kigali Heights',
        'email' => 'aline@example.com',
        'phone' => '+250 788 000 000',
        'service' => 'HVAC Design',
        'location' => 'Kigali',
        'message' => 'We need a VRF system for eight offices.',
        'source' => 'contact',
    ]);

    $response->assertRedirect(route('contact'));
    $response->assertSessionHasNoErrors();

    $enquiry = ContactEnquiry::sole();

    expect($enquiry->name)->toBe('Aline Uwase')
        ->and($enquiry->email)->toBe('aline@example.com')
        ->and($enquiry->service)->toBe('HVAC Design')
        ->and($enquiry->message)->toBe('We need a VRF system for eight offices.');
});

test('an enquiry without the required fields is rejected', function () {
    $response = $this->from(route('contact'))->post(route('contact.store'), []);

    $response->assertSessionHasErrors(['name', 'email', 'phone', 'message']);
    expect(ContactEnquiry::count())->toBe(0);
});

test('an enquiry with an invalid email address is rejected', function () {
    $response = $this->from(route('contact'))->post(route('contact.store'), [
        'name' => 'Aline Uwase',
        'email' => 'not-an-email',
        'phone' => '+250 788 000 000',
        'message' => 'We need a quote.',
    ]);

    $response->assertSessionHasErrors('email');
    expect(ContactEnquiry::count())->toBe(0);
});

test('optional fields may be omitted', function () {
    $response = $this->from(route('services.show', 'hvac-design'))->post(route('contact.store'), [
        'name' => 'Jean Habimana',
        'email' => 'jean@example.com',
        'phone' => '+250 788 111 111',
        'message' => 'My air conditioner is not cooling.',
    ]);

    $response->assertSessionHasNoErrors();
    expect(ContactEnquiry::sole()->company)->toBeNull();
});
