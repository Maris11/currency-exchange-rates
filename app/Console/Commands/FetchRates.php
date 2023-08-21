<?php

namespace App\Console\Commands;

use App\Models\Rate;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Currencies to save.
     *
     * @var string[]
     */
    protected array $currencies = ['GBP', 'USD', 'AUD'];

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $response = Http::get('https://anyapi.io/api/v1/exchange/rates?apiKey=' . env('ANYAPI_KEY'));
        $data = $response->json();

        foreach ($this->currencies as $currency) {
            $rate = new Rate();
            $rate->currency = $currency;
            $rate->rate = $data['rates'][$currency];
            $rate->save();
        }
    }
}
