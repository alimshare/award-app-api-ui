<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Award;
use App\Models\User;

class AwardApiController extends Controller
{
    public function list(Request $req)
    {
        $list = new Award;
        $type    = $req['type'];
        $minPoin = $req['min'];
        $maxPoin = $req['max'];

        $limit  = $req['limit'] ?? 10;

        if (!empty($type)) {
            $types = explode(",", strtolower($type));
            $list = $list->whereRaw("LOWER(award_type) in ('". implode("','", $types) ."')");
        }

        if (!empty($minPoin) && !empty($maxPoin)) {
            $list = $list->whereBetween('poin', [$minPoin, $maxPoin]);
        }

        $list = $list->paginate($limit);

        return response()->json($list);
    }

    public function isEmailExists(Request $req)
    {
        $email = $req['email'];
        if (empty($email)) {
            return response()->json(
                ['code'=>'400', 'message' => 'email is required'], 400
            );
        }

        $isExists = User::where('email', $req['email'])->exists();
        
        return response()->json(['code'=>200, 'message'=>'success', 'data'=>[
            "exists" => $isExists, 
            "email"  => $email,
        ]], 200);
    }
}
