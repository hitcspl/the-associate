<?php

it('stores a contact inquiry with a subject', function () {
    $response = $this
        ->from('/')->post('/inquiries', [
            'name' => 'Amelia Hart',
            'email' => 'amelia@example.com',
            'phone' => '+1 (555) 123-4567',
            'subject' => 'Property Purchase',
            'message' => 'I would like a private tour of the Beverly Hills residence.',
        ]);

    $response->assertRedirect('/');
    $response->assertSessionHas('contactSuccess', true);
    $this->assertDatabaseHas('inquiries', [
        'name' => 'Amelia Hart',
        'email' => 'amelia@example.com',
        'phone' => '+1 (555) 123-4567',
        'subject' => 'Property Purchase',
        'message' => 'I would like a private tour of the Beverly Hills residence.',
    ]);
    $this->assertDatabaseCount('inquiries', 1);
});

it('requires a subject and message to submit an inquiry', function () {
    $response = $this
        ->from('/')
        ->post('/inquiries', [
            'name' => 'Noah Price',
            'email' => 'noah@example.com',
            'phone' => '+1 (555) 987-6543',
        ]);

    $response->assertSessionHasErrors(['subject', 'message']);
    $this->assertDatabaseCount('inquiries', 0);
});
